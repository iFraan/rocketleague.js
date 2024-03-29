import { API, PLATFORM } from './src/index';

const test = async () => {
    try {
        const user = await API.fetchUser(PLATFORM.Epic, 'iFraan');
        console.log('User:', user.getUserinfo());
        console.log('Overview:', user.overview());
        console.log('2v2: ', user.get2v2());
        console.log('3v3: ', user.get3v3());
        console.log('ALL ', user.getData());
    } catch (e) {
        console.log(e);
    }
};

test();
