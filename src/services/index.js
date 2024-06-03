export const sendOTP = async (email, phone, apikey, token) => {
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
            'Authorization': `Bearer ${token}`,
            'uuid': `${apikey}`
        },
    })
    const data = await response.json();
    return data;
} catch(err) {
    console.log(err);
}
}

export const verifyOTP = async (email, phone, otp, apikey, token) => {
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
            'Authorization': `Bearer ${token}`,
            'uuid': `${apikey}`
        },
    })
    const data = await response.json();
    return data;
} catch(err) {
    console.log(err);
}
}

export const sendBvnOtp = async (bvn, apikey, token) => {
    const payload = {
        bvn: bvn
    }
    try {
        const response = await fetch('https://wallet-user-api.test.thekredibank.com/api/onboarding/v2/bvn/verify', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'uuid': `${apikey}`
        },
    })
    const data = await response.json();
    return data;
} catch(err) {
    console.log(err);
}
}

export const verifyBVN = async (bvn, otp, apikey, token) => {
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
            'Authorization': `Bearer ${token}`,
            'uuid': `${apikey}`
        },
    })
    const data = await response.json();
    return data;
} catch(err) {
    console.log(err);
}
}

export const createCustomer = async (userData, apikey, token) => {
    try {
        const response = await fetch('https://wallet-user-api.test.thekredibank.com/api/onboarding/v2/customer/create', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'uuid': `${apikey}`
        },
    })
    const data = await response.json();
    return data;
} catch(err) {
    console.log(err);
}
}

export const createBusiness = async (businessData, apikey, token) => {
    try {
        const response = await fetch('https://wallet-user-api.test.thekredibank.com/api/onboarding/v2/business/create', {
        method: 'POST',
        body: JSON.stringify(businessData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'uuid': `${apikey}`
        },
    })
    const data = await response.json();
    return data;
} catch(err) {
    console.log(err);
}
}

export const verifyCustomer = async (customerData, apikey, token) => {
    try {
        const response = await fetch('https://wallet-user-api.test.thekredibank.com/api/onboarding/v2/validate', {
        method: 'POST',
        body: JSON.stringify(customerData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'uuid': `${apikey}`
        },
    })
    const data = await response.json();
    return data;
} catch(err) {
    console.log(err);
}
}

export const verifyBVNFromNibss = async () => {
    try {
        const response = await fetch('https://identity-pass.test.thekredibank.com/api/bvn/authorize', {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json();
    return data;
} catch(err) {
    console.log(err);
}
}

export const verifyUserBVNDetails = async (bvn, bvntoken) => {
    const payload = {
        bvn: bvn
    }
    try {
        const response = await fetch('https://identity-pass.test.thekredibank.com/api/bvn/verify-bvn', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bvntoken}`,
        },
    })
    const data = await response.json();
    return data;
} catch(err) {
    console.log(err);
}
}

export const redirectToLogin = (link) => {
    window.location.href = link;
}

export const redirectToTerms = () => {
    window.location.href = "https://thekredibank.com/";
}