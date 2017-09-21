export const serviceWorkerConfig = {
    excludes: [
        '**/.*',
        '**/*.map',
        '*.html',
        '/',
        '/favicon.ico',
        '/__webpack_hmr'
    ],
    ENABLE_KEY: Symbol('enable_service_worker')
}