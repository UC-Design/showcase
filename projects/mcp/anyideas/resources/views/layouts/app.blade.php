<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>any.ideas</title>
        <link rel="dns-prefetch" href="//fonts.googleapis.com">
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    </head>
    <body>
        @if(auth()->check())
        <script>
            window.checkAuth = {!! auth()->user()  !!}
        </script>
        @endif

        <div id="app">
            <app />
        </div>
        
        @include ('footer')
        <script src="{{ mix('js/App.js') }}"></script>
    </body>
</html>