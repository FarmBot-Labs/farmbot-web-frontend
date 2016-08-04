import * as toast from "toastr";

let lastMsgID = "Prevent Annoying Duplicates";

export function success(messageID, titleID = "success-t-default") {
	document.l10n.get('main').formatValues(
		messageID,
		titleID
	).then(
		([message, title]) => toast.success(message, title)
	);
}

// Warnings fire once, to avoid bombarding the user with repetitious errors
// Eg: "Can't connect to server!" might get repetitive.
export function warning(messageID, titleID = "warning-t-default") {
	document.l10n.get('main').formatValues(
		messageID,
		titleID
	).then(
		([message, title]) => {
			if (lastMsgID === messageID) {
				console.warn(message); // console now displays localized `message`; use `messageID` for non-localized logging
			} else {
				toast.warning(message, title);
				lastMsgID = messageID;
			}
		}
	);
}

// Errors can fire multiple times for situations such as password guessing
export function error(messageID, titleID = "error-t-default") {
	document.l10n.get('main').formatValues(
		messageID,
		titleID
	).then(
		([message, title]) => toast.error(message, title)
	);
}
