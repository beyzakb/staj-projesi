from django.contrib import admin
from .models import *
from django.utils.html import format_html
from mptt.admin import DraggableMPTTAdmin
# Register your models here.
class MyDraggableMPTTAdmin(DraggableMPTTAdmin):
    readonly_fields =()
    list_display = ('tree_actions','something','referanceActive','slug')
    list_display_links = ('something',)
    list_editable =('referanceActive',)

    def something(self,instance):
        return format_html(
            '<div style="text-indent:{}px">{}</div>',
            instance._mpttfield('level') * self.mptt_level_indent,
            instance.isim,
        )

admin.site.register(Kategori,MyDraggableMPTTAdmin)
admin.site.register(Kbaslik)