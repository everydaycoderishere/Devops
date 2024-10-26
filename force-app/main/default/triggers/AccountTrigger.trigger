trigger AccountTrigger on Account (before insert,before update) {
    if (trigger.isInsert) {
        System.debug('before insert trigger called');
    }
   
    
    if (trigger.isUpdate) {
        System.debug('before update trigger called');
    }
}