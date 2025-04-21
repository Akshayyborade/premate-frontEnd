import SystemAdminService from '../services/systemAdminService';

export async function testMockLogin() {
    const systemAdminService = SystemAdminService.getInstance();

    // Test login with correct credentials
    console.log('Testing login with correct credentials...');
    const success = await systemAdminService.login({
        username: 'admin',
        password: 'admin123'
    });
    console.log('Login result:', success ? 'Success' : 'Failed');

    if (success) {
        // Test authentication check
        console.log('Testing authentication check...');
        const isAuthenticated = systemAdminService.isAuthenticated();
        console.log('Is authenticated:', isAuthenticated);

        // Test mock API calls
        console.log('Testing mock API calls...');
        try {
            const usersResponse = await systemAdminService.mockApiCall('/users');
            console.log('Users API response:', usersResponse);

            const settingsResponse = await systemAdminService.mockApiCall('/settings');
            console.log('Settings API response:', settingsResponse);
        } catch (error) {
            console.error('API call failed:', error);
        }

        // Test logout
        console.log('Testing logout...');
        await systemAdminService.logout();
        console.log('Is authenticated after logout:', systemAdminService.isAuthenticated());
    }
}

// Run the test
testMockLogin().catch(console.error); 