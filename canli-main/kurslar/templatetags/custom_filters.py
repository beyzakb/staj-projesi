# custom_filters.py
from django import template

register = template.Library()

@register.filter(name='custom_split')
def custom_split(value, arg):
    return value.split(arg)


@register.filter(name='ilk_uc')
def ilk_uc(queryset):
    return queryset[:3]