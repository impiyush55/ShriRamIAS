# Wallet-Based Course Purchase Implementation

This document outlines the implementation of the wallet-based purchase system for the LMS platform.

## Backend Implementation

### 1. MongoDB Schemas
- **User**: Added `walletBalance` field (default ₹50).
- **Course**: Standard course model.
- **Enrollment**: Tracks student-course mapping with `amount` and `paymentMethod`. Includes a unique index on `[studentId, courseId]` to prevent duplicate purchases.
- **WalletTransaction**: Logs every debit/credit for audit trails.

### 2. API Endpoint: `POST /api/courses/pay-with-wallet`
- **Location**: `server/controllers/paymentController.js`
- **Logic**:
  - Uses **Mongoose Sessions & Transactions** for atomicity.
  - Checks if user is already enrolled.
  - Validates if `walletBalance >= coursePrice`.
  - Atomically: Deducts balance, Creates Enrollment, Logs Transaction.

### 3. Admin Functionality
- **API**: `GET /api/courses/admin/stats`
- **Features**: Returns total sales, enrollment count, and specific wallet revenue.

---

## Frontend Integration Example

### API Service (`src/api/paymentApi.js`)
```javascript
import axios from 'axios';

export const payWithWallet = async (courseId) => {
  const token = localStorage.getItem('token');
  const response = await axios.post('/api/courses/pay-with-wallet', { courseId }, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
};
```

### Component Usage (`CourseCard.jsx`)
```javascript
const handlePurchase = async () => {
  try {
    setLoading(true);
    const result = await payWithWallet(course.id);
    
    if (result.success) {
      alert("Enrolled Successfully! Access your course in 'My Courses'.");
      navigate('/student/my-courses');
    }
  } catch (error) {
    if (error.redirectTo) {
      alert("Insufficient Balance. Redirecting to recharge...");
      navigate(error.redirectTo);
    } else {
      alert(error.message || "Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};
```

---

## Edge Case Handling

1. **Duplicate Purchase**: Handled by Database unique index and backend check before transaction.
2. **Race Conditions**: Handled by Mongoose `startTransaction()`; ensures balance isn't deducted twice or enrollment created without payment.
3. **Network Failure**: If the server crashes mid-transaction, the balance deduction is rolled back.
4. **Insufficient Funds**: Returns a specific error code that triggers a redirect to the recharge page on the frontend.
5. **Unauthorized Access**: Protected by JWT middleware; only logged-in students can purchase.
