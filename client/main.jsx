import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';

Meteor.startup(() => {
  let userNameInputRef = 'manager';
  let passwordInputRef = 'P@ssw0rd';

  //userNameInputRef = Meteor.settings.testUser;
  //passwordInputRef = Meteor.settings.testPass;

  const username = userNameInputRef;
  const password = passwordInputRef;

  const { ldapDn } = Meteor.settings.public;
  const uName = (ldapDn && ldapDn.trim() !== "") ? `${username}@${ldapDn}` : username;

  Meteor.loginWithLDAP(
      uName, password,

      { dn: uName, search: `(sAMAccountName=${uName})` },

      (error) => {
        if (error) {

            //this.setState({ error: "Failed to authenticate." });
            console.log(error);
            console.log("Failed to authenticate");
        }
      }
  );

  render(<App/>, document.getElementById('react-target'));
})
