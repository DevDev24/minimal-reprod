import { Meteor } from 'meteor/meteor';
//import { LinksCollection } from '/imports/api/links';
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";

/*
function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}
 */

Meteor.startup(() => {
  // If the Links collection is empty, add some data.

  LDAP_DEFAULTS.url = Meteor.settings.private.ldapUrl;

  if (Meteor.settings.private.ldapUrl.toLowerCase().startsWith("ldaps")) {
    LDAP_DEFAULTS.ldapsCertificate = Assets.getText("certs/ca-bundle.pem"); // location for SSL cert
    LDAP_DEFAULTS.port = 636; // default port for LDAPS
  }
  Accounts.config({ forbidClientAccountCreation: true, loginExpirationInDays: 1 });
  Accounts.validateLoginAttempt((attempt) => {
    if (!attempt.allowed) { // not allowed
      return false;
    }
    if (attempt.methodArguments[0].ldapPass === "") {
      return false;
    }
    if (attempt.user && !Roles.userIsInRole(attempt.user._id, "Manager")) { // if not manager, access is denied
      return false;
    }
    return true;
  });

  Meteor.users.deny({ update: () => true });
  

//  if (LinksCollection.find().count() === 0) {
//    insertLink({
//      title: 'Do the Tutorial',
//      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
//    });

//    insertLink({
//      title: 'Follow the Guide',
//      url: 'http://guide.meteor.com'
//    });

//    insertLink({
//      title: 'Read the Docs',
//      url: 'https://docs.meteor.com'
//    });

//    insertLink({
//      title: 'Discussions',
//      url: 'https://forums.meteor.com'
//    });
//  }
});

Meteor.onConnection((conn) => {
  const clientIp = conn.clientAddress;

});
