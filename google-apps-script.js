/**
 * DEBUG READY GOOGLE APPS SCRIPT FOR ENCODE UNLIMITED
 */

function doGet(e) {
    return doPost(e);
}

function doPost(e) {
    try {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = ss.getSheetByName("Submissions") || ss.getSheets()[0];
        
        // Log incoming data for debugging (Check 'Executions' tab to see this)
        Logger.log("Incoming Data: " + JSON.stringify(e));

        // Create headers if empty
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(["Timestamp", "Form Type", "Name", "Email", "Company/Priority", "Message/Scope", "Processed?"]);
        }

        var params = e.parameter;
        var type = params.formType || "Unknown";
        
        var now = new Date();
        var timestamp = Utilities.formatDate(now, "GMT+5:30", "yyyy-MM-dd HH:mm:ss");

        var rowData = [timestamp, type];

        if (type === "contact") {
            rowData.push(params.name || "N/A", params.email || "N/A", params.company || "N/A", params.message || "N/A");
        } else if (type === "urgent-ai") {
            rowData.push(params.name || "N/A", params.email || "N/A", params.priority || "N/A", params.scope || "N/A");
        } else if (type === "newsletter") {
            rowData.push("Newsletter Subscriber", params.email || "N/A", "N/A", "Subscribed to newsletter");
        } else {
            rowData.push(params.name || "N/A", params.email || "N/A", "N/A", JSON.stringify(params));
        }

        // Add 'false' default for Column G (7th Column)
        rowData.push(false);

        // Find next empty row based on Column A (Timestamp)
        var timestamps = sheet.getRange("A:A").getValues();
        var nextRow = 1;
        for (var i = 0; i < timestamps.length; i++) {
            if (timestamps[i][0] == "" || timestamps[i][0] == null) {
                nextRow = i + 1;
                break;
            }
            if (i == timestamps.length - 1) nextRow = timestamps.length + 1;
        }

        Logger.log("Target Row: " + nextRow);

        // Write row data
        sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);

        // Add Checkbox Validation to Column G
        var cell = sheet.getRange(nextRow, 7);
        var rule = SpreadsheetApp.newDataValidation().requireCheckbox().build();
        cell.setDataValidation(rule).setValue(false);

        // --- EMAIL NOTIFICATION ---
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

        emailBody += "\nView in Sheet: " + ss.getUrl();

        MailApp.sendEmail({
            to: recipients,
            subject: subject,
            body: emailBody
        });

        return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        Logger.log("Error logic: " + error.toString());
        return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
