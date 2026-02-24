// ============================================================
// CREDITU ADMIN PANEL — DUMMY DATA
// ============================================================

export const adminStats = [
    {
        id: 1,
        label: 'Total Users',
        value: '48,392',
        rawValue: 48392,
        trend: '+12.4%',
        trendUp: true,
        sub: 'vs last month',
        color: 'blue',
        gradient: 'admin-gradient-blue',
        icon: 'Users',
    },
    {
        id: 2,
        label: 'Active Loans',
        value: '12,847',
        rawValue: 12847,
        trend: '+8.1%',
        trendUp: true,
        sub: 'vs last month',
        color: 'green',
        gradient: 'admin-gradient-green',
        icon: 'FileText',
    },
    {
        id: 3,
        label: 'Total Disbursed',
        value: '₹94.6 Cr',
        rawValue: 946000000,
        trend: '+18.7%',
        trendUp: true,
        sub: 'vs last month',
        color: 'gold',
        gradient: 'admin-gradient-gold',
        icon: 'IndianRupee',
    },
    {
        id: 4,
        label: 'Total Revenue',
        value: '₹6.2 Cr',
        rawValue: 62000000,
        trend: '+5.3%',
        trendUp: true,
        sub: 'vs last month',
        color: 'purple',
        gradient: 'admin-gradient-purple',
        icon: 'TrendingUp',
    },
    {
        id: 5,
        label: 'Pending Approvals',
        value: '1,204',
        rawValue: 1204,
        trend: '-3.2%',
        trendUp: false,
        sub: 'needs attention',
        color: 'teal',
        gradient: 'admin-gradient-teal',
        icon: 'Clock',
    },
];

export const loanGrowthData = [
    { month: 'Aug', loans: 820, disbursed: 42 },
    { month: 'Sep', loans: 1100, disbursed: 55 },
    { month: 'Oct', loans: 980, disbursed: 49 },
    { month: 'Nov', loans: 1340, disbursed: 67 },
    { month: 'Dec', loans: 1580, disbursed: 79 },
    { month: 'Jan', loans: 1920, disbursed: 96 },
    { month: 'Feb', loans: 2240, disbursed: 112 },
];

export const revenueData = [
    { month: 'Aug', revenue: 24, expenses: 14 },
    { month: 'Sep', revenue: 31, expenses: 18 },
    { month: 'Oct', revenue: 28, expenses: 16 },
    { month: 'Nov', revenue: 40, expenses: 22 },
    { month: 'Dec', revenue: 48, expenses: 24 },
    { month: 'Jan', revenue: 55, expenses: 28 },
    { month: 'Feb', revenue: 62, expenses: 32 },
];

export const loanDistribution = [
    { name: 'Personal Loan', value: 62, color: '#0A2C5A' },
    { name: 'Medical Loan', value: 18, color: '#00A651' },
    { name: 'Career Loan', value: 12, color: '#F4A100' },
    { name: 'Home Loan', value: 8, color: '#7c3aed' },
];

export const recentActivity = [
    { id: 'LN-20847', user: 'Priya Sharma', avatar: 'PS', amount: '₹2,50,000', status: 'Approved', date: '24 Feb 2026', type: 'Personal Loan' },
    { id: 'LN-20846', user: 'Rahul Gupta', avatar: 'RG', amount: '₹5,00,000', status: 'Pending', date: '24 Feb 2026', type: 'Medical Loan' },
    { id: 'LN-20845', user: 'Ananya Verma', avatar: 'AV', amount: '₹1,00,000', status: 'Approved', date: '23 Feb 2026', type: 'Personal Loan' },
    { id: 'LN-20844', user: 'Karan Singh', avatar: 'KS', amount: '₹3,50,000', status: 'Rejected', date: '23 Feb 2026', type: 'Career Loan' },
    { id: 'LN-20843', user: 'Meera Patel', avatar: 'MP', amount: '₹7,50,000', status: 'Pending', date: '22 Feb 2026', type: 'Personal Loan' },
    { id: 'LN-20842', user: 'Amit Joshi', avatar: 'AJ', amount: '₹4,20,000', status: 'Approved', date: '22 Feb 2026', type: 'Medical Loan' },
    { id: 'LN-20841', user: 'Sonia Reddy', avatar: 'SR', amount: '₹2,00,000', status: 'Rejected', date: '21 Feb 2026', type: 'Personal Loan' },
];

export const usersData = [
    {
        id: 'U-10001', name: 'Priya Sharma', email: 'priya.sharma@gmail.com', phone: '+91 98765 43210',
        creditScore: 742, kycStatus: 'Verified', accountStatus: 'Active', joinDate: '15 Jan 2026',
        avatar: 'PS', loans: 2, totalBorrowed: '₹3,50,000', city: 'Mumbai', pan: 'ABCPS1234F',
        aadhaar: 'XXXX XXXX 4521', income: '₹95,000/mo', occupation: 'Software Engineer',
    },
    {
        id: 'U-10002', name: 'Rahul Gupta', email: 'rahul.gupta@gmail.com', phone: '+91 87654 32109',
        creditScore: 695, kycStatus: 'Pending', accountStatus: 'Active', joinDate: '18 Jan 2026',
        avatar: 'RG', loans: 1, totalBorrowed: '₹5,00,000', city: 'Delhi', pan: 'BCDPG5678H',
        aadhaar: 'XXXX XXXX 7832', income: '₹1,20,000/mo', occupation: 'Business Owner',
    },
    {
        id: 'U-10003', name: 'Ananya Verma', email: 'ananya.v@outlook.com', phone: '+91 76543 21098',
        creditScore: 788, kycStatus: 'Verified', accountStatus: 'Active', joinDate: '20 Jan 2026',
        avatar: 'AV', loans: 3, totalBorrowed: '₹7,80,000', city: 'Bangalore', pan: 'CDEVP9012K',
        aadhaar: 'XXXX XXXX 3301', income: '₹2,10,000/mo', occupation: 'Doctor',
    },
    {
        id: 'U-10004', name: 'Karan Singh', email: 'karan.singh@yahoo.com', phone: '+91 65432 10987',
        creditScore: 621, kycStatus: 'Rejected', accountStatus: 'Blocked', joinDate: '22 Jan 2026',
        avatar: 'KS', loans: 0, totalBorrowed: '₹0', city: 'Pune', pan: 'DEFSK3456M',
        aadhaar: 'XXXX XXXX 9912', income: '₹45,000/mo', occupation: 'Student',
    },
    {
        id: 'U-10005', name: 'Meera Patel', email: 'meera.patel@gmail.com', phone: '+91 54321 09876',
        creditScore: 715, kycStatus: 'Verified', accountStatus: 'Active', joinDate: '25 Jan 2026',
        avatar: 'MP', loans: 1, totalBorrowed: '₹7,50,000', city: 'Ahmedabad', pan: 'EFGMP7890P',
        aadhaar: 'XXXX XXXX 6643', income: '₹1,80,000/mo', occupation: 'CA',
    },
    {
        id: 'U-10006', name: 'Amit Joshi', email: 'amit.joshi@rediff.com', phone: '+91 43210 98765',
        creditScore: 758, kycStatus: 'Verified', accountStatus: 'Active', joinDate: '28 Jan 2026',
        avatar: 'AJ', loans: 2, totalBorrowed: '₹4,20,000', city: 'Jaipur', pan: 'FGHAJ2345R',
        aadhaar: 'XXXX XXXX 2287', income: '₹1,10,000/mo', occupation: 'Architect',
    },
    {
        id: 'U-10007', name: 'Sonia Reddy', email: 'sonia.reddy@gmail.com', phone: '+91 32109 87654',
        creditScore: 643, kycStatus: 'Verified', accountStatus: 'Active', joinDate: '01 Feb 2026',
        avatar: 'SR', loans: 1, totalBorrowed: '₹2,00,000', city: 'Hyderabad', pan: 'GHISR6789T',
        aadhaar: 'XXXX XXXX 5571', income: '₹75,000/mo', occupation: 'Teacher',
    },
    {
        id: 'U-10008', name: 'Vikram Nair', email: 'vikram.nair@gmail.com', phone: '+91 21098 76543',
        creditScore: 801, kycStatus: 'Verified', accountStatus: 'Active', joinDate: '03 Feb 2026',
        avatar: 'VN', loans: 4, totalBorrowed: '₹12,00,000', city: 'Kochi', pan: 'HIJVN0123V',
        aadhaar: 'XXXX XXXX 8899', income: '₹3,50,000/mo', occupation: 'Entrepreneur',
    },
];

export const loansData = [
    {
        id: 'LN-20847', userId: 'U-10001', user: 'Priya Sharma', avatar: 'PS', type: 'Personal Loan',
        amount: 250000, tenure: 24, interest: 9.5, emi: 11520, status: 'Approved',
        appliedDate: '20 Feb 2026', approvedDate: '24 Feb 2026', disbursedDate: '24 Feb 2026',
        purpose: 'Home Renovation', city: 'Mumbai',
        emiBreakdown: [
            { month: 1, emi: 11520, principal: 9645, interest: 1875, balance: 240355 },
            { month: 2, emi: 11520, principal: 9718, interest: 1802, balance: 230637 },
            { month: 3, emi: 11520, principal: 9791, interest: 1729, balance: 220846 },
        ],
    },
    {
        id: 'LN-20846', userId: 'U-10002', user: 'Rahul Gupta', avatar: 'RG', type: 'Medical Loan',
        amount: 500000, tenure: 36, interest: 10.5, emi: 16280, status: 'Pending',
        appliedDate: '22 Feb 2026', approvedDate: null, disbursedDate: null,
        purpose: 'Medical Surgery', city: 'Delhi',
        emiBreakdown: [],
    },
    {
        id: 'LN-20845', userId: 'U-10003', user: 'Ananya Verma', avatar: 'AV', type: 'Personal Loan',
        amount: 100000, tenure: 12, interest: 8.9, emi: 8740, status: 'Approved',
        appliedDate: '18 Feb 2026', approvedDate: '22 Feb 2026', disbursedDate: '23 Feb 2026',
        purpose: 'Travel', city: 'Bangalore',
        emiBreakdown: [],
    },
    {
        id: 'LN-20844', userId: 'U-10004', user: 'Karan Singh', avatar: 'KS', type: 'Career Loan',
        amount: 350000, tenure: 48, interest: 11.0, emi: 9050, status: 'Rejected',
        appliedDate: '15 Feb 2026', approvedDate: null, disbursedDate: null,
        purpose: 'MBA Fees', city: 'Pune',
        emiBreakdown: [],
    },
    {
        id: 'LN-20843', userId: 'U-10005', user: 'Meera Patel', avatar: 'MP', type: 'Personal Loan',
        amount: 750000, tenure: 60, interest: 9.8, emi: 15840, status: 'Pending',
        appliedDate: '24 Feb 2026', approvedDate: null, disbursedDate: null,
        purpose: 'Business Expansion', city: 'Ahmedabad',
        emiBreakdown: [],
    },
    {
        id: 'LN-20842', userId: 'U-10006', user: 'Amit Joshi', avatar: 'AJ', type: 'Medical Loan',
        amount: 420000, tenure: 30, interest: 10.2, emi: 16100, status: 'Approved',
        appliedDate: '10 Feb 2026', approvedDate: '14 Feb 2026', disbursedDate: '15 Feb 2026',
        purpose: 'Surgery', city: 'Jaipur',
        emiBreakdown: [],
    },
];

export const transactionsData = [
    { id: 'TXN-881234', user: 'Priya Sharma', avatar: 'PS', loanId: 'LN-20847', amount: '₹11,520', mode: 'UPI', status: 'Success', date: '01 Mar 2026', type: 'EMI Payment' },
    { id: 'TXN-881233', user: 'Rahul Gupta', avatar: 'RG', loanId: 'LN-20830', amount: '₹16,280', mode: 'Net Banking', status: 'Success', date: '28 Feb 2026', type: 'EMI Payment' },
    { id: 'TXN-881232', user: 'Ananya Verma', avatar: 'AV', loanId: 'LN-20845', amount: '₹2,50,000', mode: 'NEFT', status: 'Success', date: '24 Feb 2026', type: 'Disbursement' },
    { id: 'TXN-881231', user: 'Karan Singh', avatar: 'KS', loanId: 'LN-20812', amount: '₹9,050', mode: 'UPI', status: 'Failed', date: '23 Feb 2026', type: 'EMI Payment' },
    { id: 'TXN-881230', user: 'Meera Patel', avatar: 'MP', loanId: 'LN-20800', amount: '₹15,840', mode: 'IMPS', status: 'Pending', date: '22 Feb 2026', type: 'EMI Payment' },
    { id: 'TXN-881229', user: 'Amit Joshi', avatar: 'AJ', loanId: 'LN-20842', amount: '₹4,20,000', mode: 'RTGS', status: 'Success', date: '15 Feb 2026', type: 'Disbursement' },
    { id: 'TXN-881228', user: 'Sonia Reddy', avatar: 'SR', loanId: 'LN-20790', amount: '₹8,400', mode: 'UPI', status: 'Success', date: '14 Feb 2026', type: 'EMI Payment' },
    { id: 'TXN-881227', user: 'Vikram Nair', avatar: 'VN', loanId: 'LN-20785', amount: '₹22,000', mode: 'Net Banking', status: 'Success', date: '13 Feb 2026', type: 'EMI Payment' },
];

export const emiData = [
    { id: 'EMI-5001', user: 'Karan Singh', avatar: 'KS', loanId: 'LN-20812', amount: '₹9,050', dueDate: '10 Jan 2026', status: 'Overdue', daysOverdue: 45 },
    { id: 'EMI-5002', user: 'Sonia Reddy', avatar: 'SR', loanId: 'LN-20790', amount: '₹8,400', dueDate: '15 Feb 2026', status: 'Overdue', daysOverdue: 9 },
    { id: 'EMI-5003', user: 'Priya Sharma', avatar: 'PS', loanId: 'LN-20847', amount: '₹11,520', dueDate: '01 Mar 2026', status: 'Upcoming', daysOverdue: 0 },
    { id: 'EMI-5004', user: 'Rahul Gupta', avatar: 'RG', loanId: 'LN-20830', amount: '₹16,280', dueDate: '05 Mar 2026', status: 'Upcoming', daysOverdue: 0 },
    { id: 'EMI-5005', user: 'Ananya Verma', avatar: 'AV', loanId: 'LN-20845', amount: '₹8,740', dueDate: '23 Mar 2026', status: 'Upcoming', daysOverdue: 0 },
    { id: 'EMI-5006', user: 'Meera Patel', avatar: 'MP', loanId: 'LN-20800', amount: '₹15,840', dueDate: '20 Jan 2026', status: 'Paid', daysOverdue: 0 },
    { id: 'EMI-5007', user: 'Amit Joshi', avatar: 'AJ', loanId: 'LN-20842', amount: '₹16,100', dueDate: '15 Feb 2026', status: 'Paid', daysOverdue: 0 },
    { id: 'EMI-5008', user: 'Vikram Nair', avatar: 'VN', loanId: 'LN-20785', amount: '₹22,000', dueDate: '10 Feb 2026', status: 'Paid', daysOverdue: 0 },
];

export const notificationsData = [
    { id: 1, title: 'Loan Approval Alert', message: 'Your loan application LN-20847 has been approved!', target: 'Priya Sharma', type: 'Loan', date: '24 Feb 2026', status: 'Sent', icon: 'CheckCircle' },
    { id: 2, title: 'EMI Reminder', message: 'Your EMI of ₹11,520 is due on 01 Mar 2026.', target: 'Priya Sharma', type: 'EMI', date: '22 Feb 2026', status: 'Sent', icon: 'Bell' },
    { id: 3, title: 'KYC Pending', message: 'Complete your KYC verification to apply for loans.', target: 'All Users', type: 'Bulk', date: '20 Feb 2026', status: 'Sent', icon: 'AlertCircle' },
    { id: 4, title: 'Document Rejected', message: 'Your PAN card image is blurry. Please re-upload.', target: 'Karan Singh', type: 'KYC', date: '16 Feb 2026', status: 'Sent', icon: 'XCircle' },
    { id: 5, title: 'New Offer Available', message: 'You are pre-approved for ₹5,00,000 Personal Loan at 9.3%!', target: 'All Users', type: 'Promo', date: '15 Feb 2026', status: 'Draft', icon: 'Gift' },
];

export const userGrowthData = [
    { month: 'Aug', users: 3200 },
    { month: 'Sep', users: 4400 },
    { month: 'Oct', users: 5800 },
    { month: 'Nov', users: 7200 },
    { month: 'Dec', users: 9500 },
    { month: 'Jan', users: 13800 },
    { month: 'Feb', users: 18400 },
];

export const monthlyReport = [
    { month: 'August', disbursed: 42, revenue: 24, users: 3200, loans: 820, npa: 1.2 },
    { month: 'September', disbursed: 55, revenue: 31, users: 4400, loans: 1100, npa: 1.4 },
    { month: 'October', disbursed: 49, revenue: 28, users: 5800, loans: 980, npa: 1.1 },
    { month: 'November', disbursed: 67, revenue: 40, users: 7200, loans: 1340, npa: 1.3 },
    { month: 'December', disbursed: 79, revenue: 48, users: 9500, loans: 1580, npa: 1.6 },
    { month: 'January', disbursed: 96, revenue: 55, users: 13800, loans: 1920, npa: 1.5 },
    { month: 'February', disbursed: 112, revenue: 62, users: 18400, loans: 2240, npa: 1.2 },
];
