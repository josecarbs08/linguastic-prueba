
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-97P3DKWWM5', {
            'page_path': window.location.pathname,
            'anonymize_ip': true
        });

        // Track custom events
        window.trackEvent = (eventName, data) => {
            gtag('event', eventName, data);
        };
    