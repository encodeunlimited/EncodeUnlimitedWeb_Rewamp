/**
 * GOOGLE APPS SCRIPT FOR ENCODE UNLIMITED
 * 
 * Instructions:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1JgrmxTSWi0uDJNzpjKtNzGhEMjIUFB-vIJCXckz9SSQ/edit
 * 2. Go to 'Extensions' -> 'Apps Script'.
 * 3. Delete any code and paste this script.
 * 4. Click 'Deploy' -> 'New Deployment'.
 * 5. Select type 'Web App'.
 * 6. Set 'Execute As' to 'Me'.
 * 7. Set 'Who has access' to 'Anyone' (IMPORTANT).
 * 8. Copy the 'Web App URL' and paste it into /assets/js/main.js
 */

function doGet(e) {
    return doPost(e);
}

function doPost(e) {
    try {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = ss.getSheetByName("Submissions") || ss.getSheets()[0];

        // Create headers if empty
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(["Timestamp", "Form Type", "Name", "Email", "Company/Priority", "Message/Scope"]);
        }

        // Parse parameters
        var params = e.parameter;
        var type = params.formType || "Unknown";
        var timestamp = new Date();

        var rowData = [timestamp, type];

        if (type === "contact") {
            rowData.push(params.name, params.email, params.company, params.message);
        } else if (type === "urgent-ai") {
            rowData.push(params.name, params.email, params.priority, params.scope);
        } else if (type === "newsletter") {
            rowData.push("Newsletter Subscriber", params.email, "N/A", "Subscribed to newsletter");
        } else {
            rowData.push(params.name || "N/A", params.email || "N/A", "N/A", JSON.stringify(params));
        }

        sheet.appendRow(rowData);

        // Send Email Notifications
        var recipients = [
            "info.encodeunlimited@gmail.com",
            "asanka.ird@gmail.com",
            "info@encodeunlimited.com"
        ].join(",");

        var subject = "🚀 New " + type.toUpperCase() + " Submission - Encode Unlimited";

        var emailBody = "New Lead Captured!\n\n" +
            "Time: " + timestamp + "\n" +
            "Type: " + type + "\n" +
            "-----------------------------------\n";

        for (var key in params) {
            if (key !== "formType") {
                emailBody += key.charAt(0).toUpperCase() + key.slice(1) + ": " + params[key] + "\n";
            }
        }

        emailBody += "\nView in Sheet: https://docs.google.com/spreadsheets/d/1JgrmxTSWi0uDJNzpjKtNzGhEMjIUFB-vIJCXckz9SSQ/edit";

        MailApp.sendEmail({
            to: recipients,
            subject: subject,
            body: emailBody
        });

        return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
