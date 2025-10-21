# 🔥 Updated Firestore Security Rules

## Current Issue
The API routes are trying to store data in collections like `website-contacts/contact-forms`, but Firestore doesn't allow subcollections in this format. The error shows:

```
Invalid collection reference. Collection references must have an odd number of segments, but website-contacts/contact-forms has 2.
```

## Solution
Updated the API routes to use direct collections instead of subcollections:

### New Collection Structure:
- `contact-forms` (instead of `website-contacts/contact-forms`)
- `brochure-downloads` (instead of `website-contacts/brochure-downloads`) 
- `newsletter-subscriptions` (instead of `website-contacts/newsletter-subscriptions`)

## Updated Firestore Rules

Replace your current rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data, admins can read all
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // AI Sessions - users can only access their own sessions
    match /aiSessions/{sessionId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Tests - Users can only read/write their own created tests
    match /tests/{testId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.createdBy;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.createdBy;
    }
    
    // Test Attempts - users can only access their own attempts
    match /testAttempts/{attemptId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Study Plans - users can only access their own plans
    match /studyPlans/{planId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Website Contact Forms - Public write access for form submissions, authenticated read
    match /contact-forms/{document} {
      allow read: if request.auth != null;
      allow write: if true; // Public write access for form submissions
    }
    
    // Brochure Downloads - Public write access for brochure requests, authenticated read
    match /brochure-downloads/{document} {
      allow read: if request.auth != null;
      allow write: if true; // Public write access for brochure downloads
    }
    
    // Newsletter Subscriptions - Public write access for subscriptions, authenticated read
    match /newsletter-subscriptions/{document} {
      allow read: if request.auth != null;
      allow write: if true; // Public write access for newsletter subscriptions
    }
  }
}
```

## How to Update Rules

1. Go to Firebase Console → Firestore Database → Rules
2. Replace the existing rules with the updated rules above
3. Click "Publish" to save the changes

## Expected Result

After updating the rules, form submissions should work properly and data will be stored in:
- `contact-forms` collection for contact form submissions
- `brochure-downloads` collection for brochure download requests  
- `newsletter-subscriptions` collection for newsletter signups
