from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Note, Category
from .serializers import NoteSerializer, CategorySerializer

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

    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        note = self.get_object()
        note.archived = True
        note.save()
        return Response(NoteSerializer(note).data)

    @action(detail=True, methods=['post'])
    def unarchive(self, request, pk=None):
        note = self.get_object()
        note.archived = False
        note.save()
        return Response(NoteSerializer(note).data)
