# Generated by Django 2.1.7 on 2019-08-13 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CDapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='phone',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]