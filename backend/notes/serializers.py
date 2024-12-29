from rest_framework import serializers
from .models import Note, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'created_at']

class NoteSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'archived', 'categories', 'category_ids', 'created_at', 'updated_at']

    def create(self, validated_data):
        category_ids = validated_data.pop('category_ids', [])
        note = Note.objects.create(**validated_data)
        note.categories.set(Category.objects.filter(id__in=category_ids))
        return note

    def update(self, instance, validated_data):
        category_ids = validated_data.pop('category_ids', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if category_ids is not None:
            instance.categories.set(Category.objects.filter(id__in=category_ids))
        return instance
