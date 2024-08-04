import { Router, Request, Response } from 'express';
import { Contact, sequelize } from './models';
import { Op } from 'sequelize';

const router = Router();

router.post('/identify', async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;
  let contacts = await Contact.findAll({
    where: {
      [Op.or]: [
        { email },
        { phoneNumber },
      ],
    },
  });

  if (contacts.length === 0) {
    const newContact = await Contact.create({
      email,
      phoneNumber,
    });
    return res.json({
      contact: {
        primaryContactId: newContact.id,
        emails: [newContact.email],
        phoneNumbers: [newContact.phoneNumber],
        secondaryContactIds: [],
      },
    });
  }

  const primaryContact = contacts.find(contact => contact.linkPrecedence === 'primary') || contacts[0];
  const secondaryContacts = contacts.filter(contact => contact.id !== primaryContact.id);

  for (let contact of contacts) {
    if (contact.id !== primaryContact.id) {
      contact.linkPrecedence = 'secondary';
      contact.linkedId = primaryContact.id;
      await contact.save();
    }
  }

  res.json({
    contact: {
      primaryContactId: primaryContact.id,
      emails: contacts.map(contact => contact.email).filter(email => email),
      phoneNumbers: contacts.map(contact => contact.phoneNumber).filter(phoneNumber => phoneNumber),
      secondaryContactIds: secondaryContacts.map(contact => contact.id),
    },
  });
});

export default router;
