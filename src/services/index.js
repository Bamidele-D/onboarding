export const sendOTP = async (email, phone) => {
    const payload = {
        email: email,
        phone: phone,
        key: email
    }
    try {
        const response = await fetch('https://wallet-user-api.test.thekredibank.com/api/onboarding/v2/otp/create', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 409|oBrsHQfmhKhh3kUShgvPU1My92PQTMlIURHnVFek',
                'uuid': '6c0334ae-8865-4a5d-8461-84db11ce7e74'
            },
        })
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
    }
}

export const verifyOTP = async (email, phone, otp) => {
    const payload = {
        email: email,
        phone: phone,
        key: email,
        otp: otp
    }
    try {
        const response = await fetch('https://wallet-user-api.test.thekredibank.com/api/onboarding/v2/otp/validate', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 409|oBrsHQfmhKhh3kUShgvPU1My92PQTMlIURHnVFek',
                'uuid': '6c0334ae-8865-4a5d-8461-84db11ce7e74'
            },
        })
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
    }
}

export const sendBvnOtp = async (bvn) => {
    const payload = {
        bvn: bvn
    }
    try {
        const response = await fetch('https://wallet-user-api.test.thekredibank.com/api/onboarding/v2/bvn/verify', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 409|oBrsHQfmhKhh3kUShgvPU1My92PQTMlIURHnVFek',
                'uuid': '6c0334ae-8865-4a5d-8461-84db11ce7e74'
            },
        })
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
    }
}

export const verifyBVN = async (bvn, otp) => {
    const payload = {
        bvn: bvn,
        otp: otp
    }
    try {
        const response = await fetch('https://wallet-user-api.test.thekredibank.com/api/onboarding/v2/bvn/validate', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 409|oBrsHQfmhKhh3kUShgvPU1My92PQTMlIURHnVFek',
                'uuid': '6c0334ae-8865-4a5d-8461-84db11ce7e74'
            },
        })
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
    }
}

export const createCustomer = async (userData) => {
    try {
        const response = await fetch('https://wallet-user-api.test.thekredibank.com/api/onboarding/v2/customer/create', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 409|oBrsHQfmhKhh3kUShgvPU1My92PQTMlIURHnVFek',
                'uuid': '6c0334ae-8865-4a5d-8461-84db11ce7e74'
            },
        })
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
    }
}

export const createBusiness = async (businessData) => {
    try {
        const response = await fetch('https://wallet-user-api.test.thekredibank.com/api/onboarding/v2/business/create', {
            method: 'POST',
            body: JSON.stringify(businessData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 409|oBrsHQfmhKhh3kUShgvPU1My92PQTMlIURHnVFek',
                'uuid': '6c0334ae-8865-4a5d-8461-84db11ce7e74'
            },
        })
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
    }
}

export const redirectToLogin = () => {
    window.location.href = "https://www.google.com";
}

export const redirectToTerms = () => {
    window.location.href = "https://www.google.com";
}