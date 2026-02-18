# Simple Weather App (React + Vite)

Nowoczesna aplikacja pogodowa zbudowana w React, wykorzystująca Redux Toolkit do zarządzania stanem oraz OpenWeather API do dostarczania danych w czasie rzeczywistym.

## 🚀 Funkcje

- Wyszukiwanie miast: Dynamiczne pobieranie pogody dla dowolnego miejsca na świecie.

- System Jednostek: Wybór między systemem metrycznym, imperialnym i naukowym (Kelvin), zapisywany w localStorage.

- Ulubione: Możliwość zapisywania miast do listy ulubionych zapisywany w localStorage.

- Szczegółowe dane: Prognoza na 5 dni, prędkość wiatru, zachmurzenie i aktualna data.

- Responsywność: Interfejs typu Dashboard z wygodnym paskiem bocznym.

## 🛠️ Technologie

- React 19 (Vite)

- Redux Toolkit (Global state management)

- React Router (Nawigacja)

- FontAwesome (Ikony)

- CSS3 (Custom properties/Variables)

- OpenWeatherMap 5 day / 3 hour forecast data (Rzeczywiste dane)

## 📦 Instalacja i uruchomienie

### Sklonuj repozytorium

```Bash
git clone https://github.com/specsxc/weather-app.git
```

### Przejdź do folderu projektu

```Bash
cd weather-app
```

### Zainstaluj zależności

```Bash
npm install
```

### Utwórz plik .env w głównym katalogu i dodaj swój klucz API

Klucz API możesz wygenerować na stronie [OpenWeatherMap](https://openweathermap.org/api).

```env
VITE_WEATHER_API_KEY=twoj_klucz_api
```

### Uruchom aplikację

```Bash
npm run dev
```
