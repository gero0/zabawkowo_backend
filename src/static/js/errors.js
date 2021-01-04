const ErrorMap = {
  ERR_NOT_AUTHORIZED: "Nie masz dostępu do tej strony. Czy jesteś zalogowany?",
  ERR_OFFER_NOT_FOUND: "Nie znaleziono oferty w bazie danych.",
  ERR_REQUIRED_FIELD: "Nie wypełniono wymaganego pola.",
  ERR_OFFER_NAME: "Nazwa oferty musi zawierać co najmniej 2 znaki",
  ERR_OFFER_DESC: "Pole Opis nie może być puste",
  ERR_OFFER_PRICE:
    "Podana cena nie jest prawidłowa, upewnij się, że format jest właściwy",
  ERR_ADDING_OFFER: "Nie udało się dodać oferty. Wina serwera, przepraszamy :(",
  ERR_FILE_MISSING: "Wysłano żądanie przesłania pliku nie zawierający pliku.",
  ERR_UPLOAD_FAILED:
    "Nie udało się wysłać pliku. Możliwe, że format jest niewspierany (akceptujemy jpg, png i gif)",
  ERR_FETCHING_CATEGORIES:
    "Nie udało się wczytać kategorii. Baza danych się obraziła i nie działa, pracujemy nad tym",
  ERR_USER_NOT_FOUND: "Nie znaleziono użytkownika. Czy jesteś zalogowany?",
  ERR_ADDRESS_CITY: "Pole Miasto jest wymagane",
  ERR_ADDRESS_POSTAL: "Pole Kod pocztowy jest wymagane",
  ERR_ADDRESS_STREET: "Pole Ulica jest wymagane",
  ERR_ADDING_ADDRESS:
    "Nie udało się dodać adresu. Zespół studentów został wysłany do zbadania problemu",
  ERR_USERNAME_LENGTH: "Nazwa użytkownika musi zawierać co najmniej 4 znaki",
  ERR_PASSWD_LENGTH: "Hasło musi zawieać co najmniej 8 znaków",
  ERR_EMAIL: "Email nieprawidłowy, sprawdź format",
  ERR_FIRST_NAME: "Pole Imię jest wymagane",
  ERR_LAST_NAME: "Pole Nazwisko jest wymagane",
  ERR_PHONE_NUMBER: "Nieprawdiłowy numer telefonu. Sprawdź format",
  ERR_USERNAME_EXISTS:
    "Użytkownik o tej nazwie użytkownika już istnieje. Wybierz inną",
  ERR_EMAIL_EXISTS: "Konto o tym adresie email już istnieje.",
  ERR_CREATING_USER:
    "Nie udało się utworzyć użytkownika. Astrolodzy szukają przyczyny w układzie planet",
  ERR_INCORRECT_CREDENTIALS: "Nieprawidłowy email lub hasło",
  ERR_TOKEN_EXPIRED: "Token wygasł. Wyślij nowy email do resetu hasła.",
  ERR_CHAT_SELF: "Nie próbuj wysyłać wiadomości do siebie samego. Po co obciążać serwer? ;)"
};

export default ErrorMap;
