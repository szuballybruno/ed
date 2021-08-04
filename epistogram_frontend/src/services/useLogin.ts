import Cookies from 'universal-cookie';

export const useLogin = (userId: string, supervisorId: string, token: string, role: string, organizationId: string) => {
    const cookies = new Cookies();
    cookies.set('userId', userId, { path: '/' });
}