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

class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer

    def get_queryset(self):
        queryset = Note.objects.all()
        category_id = self.request.query_params.get('category', None)
        archived = self.request.query_params.get('archived', None)

        if category_id:
            queryset = queryset.filter(categories__id=category_id)
        
        if archived is not None:
            queryset = queryset.filter(archived=archived.lower() == 'true')
        
        return queryset

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
