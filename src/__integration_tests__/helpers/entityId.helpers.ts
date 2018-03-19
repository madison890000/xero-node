import { AccountingAPIClient } from '../../AccountingAPIClient';
import { createSingleInvoiceRequest } from '../request-body/invoice.request.examples';

export async function getOrCreateInvoiceId(xero: AccountingAPIClient) {
	let response = await xero.invoices.get();
	if (response.Invoices.length <= 0) {
		response = await xero.invoices.create(createSingleInvoiceRequest);
	}
	return response.Invoices[0].InvoiceID;
}

export async function getOrCreateContactGroupId(xero: AccountingAPIClient) {
	let response = await xero.contactgroups.get();
	if (response.ContactGroups.length <= 0) {
		response = await xero.contactgroups.create({ Name: 'xero-node test' });
	}
	return response.ContactGroups[0].ContactGroupID;
}

export async function getOrCreateContactId(xero: AccountingAPIClient) {
	let response = await xero.contacts.get();
	if (response.Contacts.length <= 0) {
		response = await xero.contacts.create({ FirstName: 'xero-node test', LastName: 'Tee' });
	}
	return response.Contacts[0].ContactID;
}

export async function getOrCreateContactGroupContactId(xero: AccountingAPIClient, contactGroupId: string) {
	const getResponse = await xero.contactgroups.get({ ContactGroupID: contactGroupId });
	if (getResponse.ContactGroups[0].Contacts.length <= 0) {
		const contactId = await getOrCreateContactId(xero);
		const createResponse = await xero.contactgroups.contacts.create({ ContactID: contactId }, { ContactGroupID: contactGroupId });
		return createResponse.Contacts[0].ContactID;
	} else {
		return getResponse.ContactGroups[0].Contacts[0].ContactID;
	}
}
