import ApiService, { LoginCredentials } from '../services/apiService';

export async function loginAndAccessDashboard(username: string, password: string) {
    const apiService = ApiService.getInstance();

    try {
        // Step 1: Login
        console.log('Attempting to login...');
        const loginResponse = await apiService.login({ username, password });
        console.log('Login successful!');
        console.log('User:', loginResponse.user);

        // Step 2: Access Dashboard
        console.log('Accessing dashboard...');
        const dashboardData = await apiService.getDashboardData();
        console.log('Dashboard data:', dashboardData);

        return {
            success: true,
            user: loginResponse.user,
            dashboardData
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}

// Example usage:
// loginAndAccessDashboard('admin', 'admin123')
//     .then(result => {
//         if (result.success) {
//             console.log('Successfully logged in and accessed dashboard');
//             // You can now access the admin dashboard
//         } else {
//             console.error('Failed:', result.error);
//         }
//     }); 