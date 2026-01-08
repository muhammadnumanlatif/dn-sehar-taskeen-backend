/**
 * Handles HTTP Status Codes and returns user-friendly messages.
 * @param {number} status - The HTTP status code.
 * @returns {object} - { type: 'success' | 'error' | 'warning', message: string, title: string }
 */
export const handleStatus = (status) => {
    switch (status) {
        // Success
        case 200:
            return { type: 'success', title: 'Success', message: 'Operation completed successfully.' };
        case 201:
            return { type: 'success', title: 'Created', message: 'Resource successfully created.' };

        // Redirection (Unexpected in API usually)
        case 301:
        case 302:
            return { type: 'warning', title: 'Redirecting', message: 'Resource has moved.' };

        // Client Errors
        case 400:
            return { type: 'danger', title: 'Bad Request', message: 'Please check your input details and try again.' };
        case 401:
            return { type: 'danger', title: 'Unauthorized', message: 'You need to be logged in to perform this action.' };
        case 403:
            return { type: 'danger', title: 'Forbidden', message: 'You do not have permission to access this resource.' };
        case 404:
            return { type: 'danger', title: 'Not Found', message: 'The requested resource could not be found.' };
        case 429:
            return { type: 'warning', title: 'Too Many Requests', message: 'You are doing that too often. Please wait a moment.' };

        // Server Errors
        case 500:
            return { type: 'danger', title: 'Server Error', message: 'Something went wrong on our end. Please try again later.' };
        case 502:
        case 503:
        case 504:
            return { type: 'danger', title: 'Service Unavailable', message: 'The service is temporarily unavailable. Please check back soon.' };

        default:
            return { type: 'danger', title: 'Error', message: `An unexpected error occurred (Code: ${status})` };
    }
};
