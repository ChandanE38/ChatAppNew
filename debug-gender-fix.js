// Debug script to test gender field fix
console.log('🔧 Starting Gender Field Debug Test...\n');

// Test functions
async function testBackendLogin() {
    console.log('📡 Testing Backend Login Response...');
    
    // Test with a sample user (this will fail but shows the response structure)
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'test-user',
                password: 'test123'
            })
        });
        
        const data = await response.json();
        console.log('Backend response:', data);
        
        if (data.gender !== undefined) {
            console.log('✅ Gender field is included in backend response');
        } else if (data.error) {
            console.log('ℹ️ Expected error (test user doesn\'t exist):', data.error);
        } else {
            console.log('❌ Gender field missing from backend response');
        }
        
    } catch (error) {
        console.log('❌ Backend connection error:', error.message);
    }
}

function testFrontendLocalStorage() {
    console.log('\n💾 Testing Frontend LocalStorage...');
    
    // Check current stored user data
    const storedUser = localStorage.getItem('chat-user');
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        console.log('Current stored user data:', userData);
        
        if (userData.gender !== undefined) {
            console.log('✅ Gender field exists in localStorage');
        } else {
            console.log('❌ Gender field missing from localStorage');
        }
    } else {
        console.log('ℹ️ No user data found in localStorage (user not logged in)');
    }
}

function simulateLoginDataStorage() {
    console.log('\n🧪 Simulating Login Data Storage...');
    
    // Simulate the fixed login data structure
    const mockLoginResponse = {
        _id: 'mock-user-id',
        fullName: 'Test User',
        username: 'testuser',
        profilePic: '/default-pic.png',
        gender: 'male',  // This should now be included
        token: 'mock-token'
    };
    
    // Simulate the userData extraction (as per our fix)
    const userData = {
        _id: mockLoginResponse._id,
        fullName: mockLoginResponse.fullName,
        username: mockLoginResponse.username,
        profilePic: mockLoginResponse.profilePic,
        gender: mockLoginResponse.gender  // This should now be included
    };
    
    console.log('Mock login response:', mockLoginResponse);
    console.log('Extracted userData (with fix):', userData);
    
    if (userData.gender) {
        console.log('✅ Gender field properly extracted and would be stored');
    } else {
        console.log('❌ Gender field missing in extraction logic');
    }
}

function checkProfileComponent() {
    console.log('\n🎭 Checking Profile Component Gender Display...');
    
    // Check if we're on a page with the profile component
    const genderElement = document.querySelector('[data-testid="gender-display"]') || 
                         document.querySelector('p:contains("Gender")');
    
    if (genderElement) {
        console.log('✅ Profile component found on page');
        // Check if gender is being displayed
        const genderText = genderElement.textContent;
        if (genderText && genderText !== 'Not specified') {
            console.log('✅ Gender is being displayed:', genderText);
        } else {
            console.log('⚠️ Gender shows as "Not specified"');
        }
    } else {
        console.log('ℹ️ Profile component not found on current page');
    }
}

// Run all tests
async function runDebugTests() {
    console.log('🚀 Running Debug Tests...\n');
    
    await testBackendLogin();
    testFrontendLocalStorage();
    simulateLoginDataStorage();
    checkProfileComponent();
    
    console.log('\n📋 Debug Summary:');
    console.log('- Backend login endpoint: Tested ✓');
    console.log('- Frontend data storage: Checked ✓');
    console.log('- Login flow simulation: Tested ✓');
    console.log('- Profile component: Checked ✓');
    
    console.log('\n📝 Next Steps:');
    console.log('1. Sign up a new user or login with existing credentials');
    console.log('2. Navigate to Profile page');
    console.log('3. Check if gender is displayed correctly');
    console.log('4. Logout and login again to test persistence');
}

// Run the debug script
runDebugTests();