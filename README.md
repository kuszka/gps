# gps

Uruchamianie : 
zakładając że mamy zainstalowane Django(1.11) i Pythona (2.7.12), w głownym folderze projektu wywołujemy komendę 
'python manage.py runserver 0:8000'
w przeglądarce główne okno projektu pokaże sie nam pod adresem 0:8000/client.

Obsługa : 
Wysyłanie żądań może przebiegać w dwóch trybach. Możemy wybrać jedynie typ zdarzenia, wówczas pokażą nam się na mapie wszystkie aktualne zdarzenia o wybranym charakterze. Możemy tez określić promień i nasza lokalizacje, zawężając szukanie zdarzeń tylko do określonego obszaru. 

Swoja lokalizacje wyznaczamy przez manualne przesuniecie markera lub tez automatycznie, korzystając z przycisku „Wyszukaj moja lokalizacje”. Wykorzystanie metody automatycznej może wymagać dodatkowej konfiguracji przegladarki (ale obawiam się że na Chromie może w ogóle nie zadziałać).

