db = connect("localhost:27017/theGame");
db.users.update({}, {$rename:{"token":"email_token"}}, false, true);
db.users.update({}, {$set: {'email_token': 'cf62aad7d98b11a8'} }, false, true);
db.users.update({}, {$set: {'email_confirm': false} }, false, true);