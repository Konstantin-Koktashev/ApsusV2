import { StorageServices } from "../services/StorageService.js";
import { makeId } from "../services/utilService.js";

const gDefaultEmails = [];
var gEmails = null;
const STORAGE_KEY = "emails";
// sender,
// sendTo,
// subject,
// body,
// isRead,
// isImportant,
// isSent,
// isDraft,
(function () {
  for (let index = 0; index < 10; index++) {
    let sender=(Math.random()>0.5)? 'Kosta':'Adi'
    let sendTo=(Math.random()>0.5)? 'Google Jobs':'Coding Academy'
    let subject=(Math.random()>0.5)? 'Google Jobs':'Coding Academy'
    let body=(Math.random()>0.5)? 'Lorem Impsum Lorem Impsum Lorem Impsum':'Congrats No Lorem Here  '
    let isRead=(Math.random()>0.5)?false:true
    let isImportant=(Math.random()>0.5)?false:true
    let isSent=(Math.random()>0.5)?false:true
    let isDraft=(Math.random()>0.5)?false:true
    const email = _creatEmail(sender,sendTo,subject,body,isRead,isImportant,isSent,isDraft)
    gDefaultEmails.push(email)
  }
  _creatEmails();
})();

export const EmailServices = {
  query,
  save,
  remove,
  getEmailById,
  getShortTxt,
  toggleEmailImportance,
  setEmailToRead,
  getEmailByCatagory,
  markEmailSent,
  getOverviewEmails
};

function query(filerBy) {
  filerBy=filerBy.toLowerCase()
  
  var emails = gEmails;
  if (filerBy) {
    emails = gEmails.filter((email) => {
      return (
        email.sender.toLowerCase().includes(filerBy) ||
        email.subject.toLowerCase().includes(filerBy) ||
        email.body.toLowerCase().includes(filerBy) ||
        email.id.toLowerCase().includes(filerBy)
      );
    });
  }
  return Promise.resolve(emails);
}

function _creatEmails() {
  gEmails = StorageServices.load(STORAGE_KEY, gDefaultEmails);
  StorageServices.store(STORAGE_KEY, gEmails);
}
function _creatEmail(
  sender = "Kosta",
  sendTo ='Coding-Academy',
  subject = "Email Subject",
  body = "EmailBody",
  isRead = false,
  isImportant = false,
  isSent=false,
  isDraft=false
  
) {
  return {
    sender,
    sendTo,
    subject,
    body,
    isRead,
    isImportant,
    isSent,
    isDraft,
    sentAt: Date.now(),
    id: makeId(),
  };
}

function remove(emailId) {
  const EmailIdx = _getIdxById(emailId);
  gEmails.splice(EmailIdx, 1);
  StorageServices.store(STORAGE_KEY, gEmails);
  return Promise.resolve();
}


function save(emailToSave,isRead=false,isImportant=false,isSent=false,isDraft=false) {
  var savedEmail = emailToSave;
  if (emailToSave.id) {
      const emailIdx = _getIdxById(emailToSave.id)
      gEmails[emailIdx] = emailToSave;
  } else {
    const{SendTo,subject,body}=emailToSave
    if(isRead){
      savedEmail = _creatEmail(undefined,SendTo,subject,body,true)
      gEmails.unshift(savedEmail)
    }
    if(isImportant){
      savedEmail = _creatEmail(undefined,SendTo,subject,body,undefined,true)
      gEmails.unshift(savedEmail)
    }
    if(isSent){
      savedEmail = _creatEmail(undefined,SendTo,subject,body,undefined,undefined,true)
      gEmails.unshift(savedEmail)
    }
    if(isDraft){
      savedEmail = _creatEmail(undefined,SendTo,subject,body,undefined,undefined,undefined,true)
      gEmails.unshift(savedEmail)
    }
  }
  StorageServices.store(STORAGE_KEY, gEmails)
  return Promise.resolve(savedEmail||emailToSave)
}

function getEmailById(id) {
  let email = gEmails.find((email) => email.id === id);
  return Promise.resolve(email);
}

function getShortTxt(str) {
  return str.substr(0, 80);
}

async function toggleEmailImportance(id){
  let email= await getEmailById(id)
  email.isImportant=!email.isImportant
  save(email)
}
async function setEmailToRead(id){
  let email= await getEmailById(id)
  email.isRead=true
  save(email)
}


function _getIdxById(emailId) {
  return gEmails.findIndex(email => email.id === emailId)
}

async function getEmailByCatagory(catagory){
  if(catagory==='inbox') return gEmails
  if(catagory==='sent')return gEmails.filter(email=>email.isSent)
  if(catagory==='draft')return gEmails.filter(email=>email.isDraft)
  if(catagory==='starred')return gEmails.filter(email=>email.isImportant)
}

 function markEmailSent(emailToMark){
  emailToMark.isSent=true
}

function getOverviewEmails(){
  let emails=gEmails.filter(email=>email.isImportant)
  if(emails.length>5)emails=emails.slice(0,5)
  return emails
}