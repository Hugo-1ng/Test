from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
        if not self.is_default:
            super().delete(*args, **kwargs)

    def save(self, *args, **kwargs):
        if self.is_default:
            # Ensure only one default category exists
            Category.objects.filter(is_default=True).exclude(id=self.id).update(is_default=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'

class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    archived = models.BooleanField(default=False)
    categories = models.ManyToManyField(Category, related_name='notes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']  # This will order notes by creation date, newest first

    def __str__(self):
        return self.title
