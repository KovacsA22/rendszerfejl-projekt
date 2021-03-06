# Generated by Django 4.0.3 on 2022-03-23 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_api', '0003_device_description_device_location_task_periodic_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='qualification',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='repairmanqualification',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='task',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='taskcategory',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
