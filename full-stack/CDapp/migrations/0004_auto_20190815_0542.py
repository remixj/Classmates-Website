# Generated by Django 2.1.7 on 2019-08-15 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CDapp', '0003_auto_20190813_1306'),
    ]

    operations = [
        migrations.RenameField(
            model_name='class',
            old_name='universty',
            new_name='university',
        ),
        migrations.AlterField(
            model_name='person',
            name='work_or_study',
            field=models.CharField(blank=True, choices=[('w', 'work'), ('s', 'study')], max_length=10, null=True),
        ),
    ]
