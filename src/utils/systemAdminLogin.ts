import SystemAdminService, { SystemAdminCredentials } from '../services/systemAdminService';

export async function loginAsSystemAdmin(username: string, password: string): Promise<boolean> {
    const systemAdminService = SystemAdminService.getInstance();
    
    const credentials: SystemAdminCredentials = {
        username,
        password
    };

    try {
        const success = await systemAdminService.login(credentials);
        if (success) {
            console.log('Successfully logged in as system admin');
            return true;
        } else {
            console.error('Failed to log in as system admin');
            return false;
        }
    } catch (error) {
        console.error('Error during system admin login:', error);
        return false;
    }
}

// Example usage:
// loginAsSystemAdmin('admin', 'admin123').then(success => {
//     if (success) {
//         // You're now logged in as system admin
//         // You can access protected routes and perform admin actions
//     }
// }); 