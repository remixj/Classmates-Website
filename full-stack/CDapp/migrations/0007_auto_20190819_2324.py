# Generated by Django 2.1.7 on 2019-08-19 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CDapp', '0006_person_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='phone',
            field=models.CharField(blank=True, max_length=11, null=True),
        ),
    ]
