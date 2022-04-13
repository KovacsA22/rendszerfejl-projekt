from django.db import models
from django.utils import timezone

# feladat kategóriák


class TaskCategory(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    time_in_hours = models.IntegerField(default=0)  # normaidó (órában)
    maintenance_period_in_months = models.IntegerField(default=0)  # karbantartási periódus (hónapokban)
    instructions = models.TextField(default='instruction')
    qualifications = models.ForeignKey('Qualification', on_delete=models.CASCADE)  # végzettségek

    def __str__(self):
        return self.name


# feladatok
class Task(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    class Severity(models.IntegerChoices):  # súlyosság
        NOT_URGENT = 0  # nem sürgős
        SLIGHTLY_SEVERE = 1  # enyhén súlyos
        MODERATELY_SEVERE = 2  # közepesen súlyos
        SEVERE = 3  # súlyos
        URGENT = 4  # sürgős

    class CurrentState(models.IntegerChoices):  # állapot
        SCHEDULED = 0  # ütemezve
        DECLINED = 1  # elutasítva
        ACCEPTED = 2  # elfogadva
        STARTED = 3  # megkezdve
        FINISHED = 4  # befejezve

    severity = models.IntegerField(choices=Severity.choices, default=Severity.NOT_URGENT)  # súlyosság
    scheduled_maintenance = models.DateTimeField(default=timezone.now)  # ütemezés
    task_category = models.ForeignKey('TaskCategory', on_delete=models.CASCADE, blank=True, null=True)  # kategóriaId
    current_state = models.IntegerField(choices=CurrentState.choices, default=CurrentState.SCHEDULED)  # állapot
    user = models.ForeignKey('User', on_delete=models.CASCADE, blank=True, null=True)  # felhasználóId
    periodic = models.BooleanField(default=True)  # időszakos

    def __str__(self):
        return self.name


# eszközök
class Device(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    task_category_id = models.ForeignKey('TaskCategory', on_delete=models.CASCADE)  # kategóriaId
    description = models.TextField(default='description')  # leírás
    location = models.TextField(default='location')  # elhelyezkedés

    def __str__(self):
        return self.name


# végzettségek
class Qualification(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


# felhasználók
class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)  # felhasználónév
    password = models.CharField(max_length=255)  # jelszó

    class Role(models.IntegerChoices):
        ADMIN = 0  # rendszergazda
        DEVICE_MANAGER = 1  # eszközfelelős (jobb fordítást elfoadok)
        OPERATOR = 2  # operátor
        REPAIRMAN = 3  # karbantartó (jobb fordítást elfogadok)

    role = models.IntegerField(choices=Role.choices, default=Role.REPAIRMAN)  # szerepkör

    def __str__(self):
        return f'id: {self.id} - {self.username} - role: {self.role}'


# karbantartó_végzettség (jobb fordítást elfogadok)
class RepairmanQualification(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)  # felhasználóId
    qualification_id = models.ForeignKey('Qualification', on_delete=models.CASCADE)  # végzettségId

    def __str__(self):
        return f'user_id: {self.user_id} - qualification_id: {self.qualification_id}'


# kategória_összekapcsolások
class CategoryConnection(models.Model):
    id = models.AutoField(primary_key=True)
    parent = models.ForeignKey(TaskCategory, on_delete=models.CASCADE, related_name='parent')
    child = models.ForeignKey(TaskCategory, on_delete=models.CASCADE, related_name='child')

    def __str__(self):
        return f'parent: {self.parent} - child: {self.child}'







