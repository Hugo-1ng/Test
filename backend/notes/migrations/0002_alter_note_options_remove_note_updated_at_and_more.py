# Generated by Django 5.0 on 2024-12-29 06:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='note',
            options={'ordering': ['-created_at']},
        ),
        migrations.RemoveField(
            model_name='note',
            name='updated_at',
        ),
        migrations.AlterField(
            model_name='note',
            name='categories',
            field=models.ManyToManyField(related_name='notes', to='notes.category'),
        ),
    ]