from django.db import migrations

def create_default_category(apps, schema_editor):
    Category = apps.get_model('notes', 'Category')
    Category.objects.get_or_create(
        name='Uncategorized',
        is_default=True
    )

def reverse_default_category(apps, schema_editor):
    Category = apps.get_model('notes', 'Category')
    Category.objects.filter(name='Uncategorized', is_default=True).delete()

class Migration(migrations.Migration):
    dependencies = [
        ('notes', '0003_category_is_default'),
    ]

    operations = [
        migrations.RunPython(create_default_category, reverse_default_category),
    ]
