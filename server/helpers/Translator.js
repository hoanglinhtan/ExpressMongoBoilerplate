import I18Next from 'i18next';
import I18NBackend from 'i18next-node-fs-backend';
import Path from 'path';

export default class Translator {
    static configure(path) {
        I18Next.use(I18NBackend).init({
            ns: ['en'],
            defaultNS: 'en',
            backend: {
                loadPath: Path.resolve(__dirname, '..', 'locales', '{{ns}}.json'),
            },
            fallbackLng: 'en',
            preload: ['en'],
            saveMissing: false,
        });
    }

    static translate(message, params) {
        if (!I18Next.exists(message)) {
            return null;
        }
        return I18Next.t(message, params);
    }
}
