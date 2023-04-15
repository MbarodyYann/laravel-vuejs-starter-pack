<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>{{ config('app.name') }}</title>
</head>
<body>
<div id="app">
    <app-component></app-component>
</div>

<script src="{{ mix('/js/app.js') }}"></script>
</body>
</html>
