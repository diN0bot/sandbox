from django.http import JsonResponse


def level(request, idx):
    return JsonResponse({'board': [['t', 'e'], ['a', 'm']],
                         'words': ['team'])
