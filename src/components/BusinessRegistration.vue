<template>
    <div class="w-full">
        <div>
            <h1 class="text-3xl font-bold">Business Registration</h1>
            <p class="text-[#494D4F] text-sm">We want to know more about you.</p>
        </div>

        <div class="mt-10">
            <form>
                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">Account Type</label>
                    <select class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm">
                        <option>Account Type</option>
                    </select>
                </div>

                <div class="flex gap-5 mb-5">
                    <div class="flex flex-col w-1/2">
                        <label for="" class="text-sm text-[#62676A]">Business Name</label>
                        <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Enter First Name">
                    </div>
                    <div class="flex flex-col w-1/2">
                        <label for="" class="text-sm text-[#62676A]">Business Category</label>
                        <select class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm">
                            <option>Business Category</option>
                        </select>
                    </div>
                </div>

                <div class="flex gap-5 mb-5">
                    <div class="flex flex-col w-1/2">
                        <label for="" class="text-sm text-[#62676A]">State</label>
                        <select class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm">
                            <option>Account Type</option>
                        </select>
                    </div>
                    <div class="flex flex-col w-1/2">
                        <label for="" class="text-sm text-[#62676A]">Local Government</label>
                        <select class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm">
                            <option>Account Type</option>
                        </select>
                    </div>
                </div>
                
                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">Business Address</label>
                    <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Business Address">
                </div>

                <p class="text-sm text-[#62676A] text-center mt-5 mb-2">By clicking the “Create My Account” button, you agree to Kredi’s <a href="" class="font-bold underline">terms of acceptable use.</a></p>

                <div>
                    <button class="bg-[#1C2C35] h-[60px] w-full text-white font-semibold rounded-lg">Continue →</button>
                </div>
            </form>
        </div>
    </div>
</template>