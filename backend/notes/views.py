from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Note, Category
from .serializers import NoteSerializer, CategorySerializer
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    def destroy(self, request, *args, **kwargs):
        category = self.get_object()
        if category.is_default:
            return Response(
                {"error": "Cannot delete the default category"},
                status=status.HTTP_400_BAD_REQUEST
            )
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer

    def get_queryset(self):
        queryset = Note.objects.all()
        archived = self.request.query_params.get('archived', 'false')
        category = self.request.query_params.get('category', None)
        
        # Convert string to boolean
        archived = archived.lower() == 'true'
        
        queryset = queryset.filter(archived=archived)
        if category:
            queryset = queryset.filter(categories__id=category)
        return queryset

    def perform_create(self, serializer):
        note = serializer.save()
        category_ids = self.request.data.get('category_ids', [])
        
        # If no categories specified, add to default category
        if not category_ids:
            default_category = Category.objects.get_or_create(
                name="Uncategorized",
                is_default=True
            )[0]
            note.categories.add(default_category)
        else:
            note.categories.set(category_ids)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Note.DoesNotExist:
            return Response(
                {"error": "Note not found"},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        try:
            note = get_object_or_404(Note, pk=pk)
            note.archived = True
            note.save()
            logger.info(f"Note {note.id} archived successfully")
            return Response(NoteSerializer(note).data)
        except Note.DoesNotExist:
            logger.error(f"Note {pk} not found for archiving")
            return Response(
                {"error": "Note not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error archiving note {pk}: {str(e)}")
            return Response(
                {"error": "Failed to archive note"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['post'])
    def unarchive(self, request, pk=None):
        try:
            note = get_object_or_404(Note, pk=pk)
            note.archived = False
            note.save()
            logger.info(f"Note {note.id} unarchived successfully")
            return Response(NoteSerializer(note).data)
        except Note.DoesNotExist:
            logger.error(f"Note {pk} not found for unarchiving")
            return Response(
                {"error": "Note not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error unarchiving note {pk}: {str(e)}")
            return Response(
                {"error": "Failed to unarchive note"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
