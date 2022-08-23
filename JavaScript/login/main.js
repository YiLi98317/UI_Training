(function () {
    const DB_NAME = 'user-db';
    const DB_VERSION = 1; // Use a long long for this value (don't use a float)
    const DB_STORE_NAME = 'user-table';

    var db;

    // Used to keep track of which view is displayed to avoid uselessly reloading it
    var current_view_pub_key;

    function openDb() {
        console.log("openDb ...");
        var req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onsuccess = function (evt) {
            // Equal to: db = req.result;
            db = this.result;
            console.log("openDb DONE");
        };
        req.onerror = function (evt) {
            console.error("openDb:", evt.target.errorCode);
        };

        req.onupgradeneeded = function (evt) {
            console.log("openDb.onupgradeneeded");
            var store = evt.currentTarget.result.createObjectStore(
                DB_STORE_NAME, {keyPath: 'id', autoIncrement: true }); // 

            store.createIndex('userName', 'userName', { unique: false });
            store.createIndex('email', 'email', { unique: true });
            store.createIndex('password', 'password', { unique: false });

            // // Use transaction oncomplete to make sure the objectStore creation is
            // // finished before adding data into it.
            // store.transaction.oncomplete = (event) => {
            //     // Store values in the newly created objectStore.
            //     const userStore = db.transaction(DB_STORE_NAME, "readwrite").objectStore(DB_STORE_NAME);
            //     userData.forEach((user) => {
            //         userStore.add(user);
            //     });
            // };
        };
    }

    /**
     * @param {string} store_name
     * @param {string} mode either "readonly" or "readwrite"
     */
    function getObjectStore(store_name, mode) {
        var tx = db.transaction(store_name, mode);
        return tx.objectStore(store_name);
    }

    function clearObjectStore() {
        var store = getObjectStore(DB_STORE_NAME, 'readwrite');
        var req = store.clear();
        req.onsuccess = function (evt) {
            displayActionSuccess("Store cleared");
            displayUserList(store);
        };
        req.onerror = function (evt) {
            console.error("clearObjectStore:", evt.target.errorCode);
            displayActionFailure(this.error);
        };
    }

    function getBlob(key, store, success_callback) {
        var req = store.get(key);
        req.onsuccess = function (evt) {
            var value = evt.target.result;
            if (value)
                success_callback(value.blob);
        };
    }

    /**
     * @param {IDBObjectStore=} store
     */
    function displayUserList(store) {
        console.log("displayUserList");

        if (typeof store == 'undefined') store = getObjectStore(DB_STORE_NAME, 'readonly');

        var table_msg = $('#table-msg');
        table_msg.empty();
        var table_list = $('#table-list');
        table_list.empty();
        // Resetting the iframe so that it doesn't display previous content

        var req;
        req = store.count();
        // Requests are executed in the order in which they were made against the
        // transaction, and their results are returned in the same order.
        // Thus the count text below will be displayed before the actual pub list
        // (not that it is algorithmically important in this case).
        req.onsuccess = function (evt) {
            table_msg.append('<p>There are <strong>' + evt.target.result +
                '</strong> record(s) in the object store.</p>');
        };
        req.onerror = function (evt) {
            console.error("add error", this.error);
            displayActionFailure(this.error);
        };

        var i = 0;
        req = store.openCursor();
        req.onsuccess = function (evt) {
            var cursor = evt.target.result;

            // If the cursor is pointing at something, ask for the data
            if (cursor) {
                console.log("displayUserList cursor:", cursor);
                req = store.get(cursor.key);
                req.onsuccess = function (evt) {
                    var value = evt.target.result;
                    var list_item = $('<li>' + '[' + cursor.key + '] ' + 'userName: ' + value.userName + ' , email: ' + value.email + '</li>');

                    table_list.append(list_item);
                };

                // Move on to the next object in store
                cursor.continue();

                // This counter serves only to create distinct ids
                i++;
            } else {
                console.log("No more entries");
            }
        };
    }

    // function setInViewer(key) {
    //     console.log("setInViewer:", arguments);
    //     key = Number(key);
    //     if (key == current_view_pub_key)
    //         return;

    //     current_view_pub_key = key;

    //     var store = getObjectStore(DB_STORE_NAME, 'readonly');
    //     getBlob(key, store, function (blob) {
    //         console.log("setInViewer blob:", blob);
    //         var iframe = newViewerFrame();

    //         // It is not possible to set a direct link to the
    //         // blob to provide a mean to directly download it.
    //         if (blob.type == 'text/html') {
    //             var reader = new FileReader();
    //             reader.onload = (function (evt) {
    //                 var html = evt.target.result;
    //                 iframe.load(function () {
    //                     $(this).contents().find('html').html(html);
    //                 });
    //             });
    //             reader.readAsText(blob);
    //         } else if (blob.type.indexOf('image/') == 0) {
    //             iframe.load(function () {
    //                 var img_id = 'image-' + key;
    //                 var img = $('<img id="' + img_id + '"/>');
    //                 $(this).contents().find('body').html(img);
    //                 var obj_url = window.URL.createObjectURL(blob);
    //                 $(this).contents().find('#' + img_id).attr('src', obj_url);
    //                 window.URL.revokeObjectURL(obj_url);
    //             });
    //         } else if (blob.type == 'application/pdf') {
    //             $('*').css('cursor', 'wait');
    //             var obj_url = window.URL.createObjectURL(blob);
    //             iframe.load(function () {
    //                 $('*').css('cursor', 'auto');
    //             });
    //             iframe.attr('src', obj_url);
    //             window.URL.revokeObjectURL(obj_url);
    //         } else {
    //             iframe.load(function () {
    //                 $(this).contents().find('body').html("No view available");
    //             });
    //         }

    //     });
    // }

    /**
     * @param {string} userName
     * @param {string} password
     * @param {string} email
     */
    function addUser(userName, password, email) {
        console.log("addUser arguments:", arguments);
        var obj = { userName: userName, email: email, password: password };

        var store = getObjectStore(DB_STORE_NAME, 'readwrite');
        var req;
        try {
            req = store.add(obj);
        } catch (e) {
            if (e.name == 'DataCloneError')
                displayActionFailure("DataCloneError!");
            throw e;
        }
        req.onsuccess = function (evt) {
            console.log("Insertion in DB successful");
            displayActionSuccess();
            displayUserList(store);
        };
        req.onerror = function () {
            console.error("addUser error", this.error);
            displayActionFailure(this.error);
        };
    }

    /**
     * @param {number} key
     * @param {IDBObjectStore=} store
     */
    function validate(email, password) {
        console.log("validate:", arguments);

        if (typeof store == 'undefined')
            store = getObjectStore(DB_STORE_NAME, 'readwrite');

        // As per spec http://www.w3.org/TR/IndexedDB/#object-store-deletion-operation
        // the result of the Object Store Deletion Operation algorithm is
        // undefined, so it's not possible to know if some records were actually
        // deleted by looking at the request result.
        var req = store.index("email").get(email);
        req.onsuccess = function (evt) {
            var record = evt.target.result;
            console.log("record:", record);
            if (typeof record == 'undefined') {
                displayActionFailure("No matching email found");
                alert("Email or password error");
                return;
            }

            if(record.password != password) {
                displayActionFailure("Email or password error");
                alert("Email or password error");
                return;
            }

            localStorage.setItem('curr', record.userName);
            window.location.href = "welcome.html";
        };
        req.onerror = function (evt) {
            console.error("validate:", evt.target.errorCode);
        };
    }

    function displayActionSuccess(msg) {
        msg = typeof msg != 'undefined' ? "Success: " + msg : "Success";
        $('#msg').html('<span class="action-success">' + msg + '</span>');
    }
    function displayActionFailure(msg) {
        msg = typeof msg != 'undefined' ? "Failure: " + msg : "Failure";
        $('#msg').html('<span class="action-failure">' + msg + '</span>');
    }
    function resetActionStatus() {
        console.log("resetActionStatus ...");
        $('#msg').empty();
        console.log("resetActionStatus DONE");
    }

    function addEventListeners() {
        console.log("addEventListeners");

        $('#login-reset').click(function (evt) {
            resetActionStatus();
        });

        $('#add-button').click(function (evt) {
            console.log("add ...");
            var userName = $('#userName').val();
            var password = $('#password').val();
            var email = $('#email').val();
            if (!userName || !password || !email) {
                displayActionFailure("Required field(s) missing");
                return;
            }

            addUser(userName, password, email);
        });

        $('#login-button').click(function (evt) {
            evt.preventDefault();
            console.log("logging in ...");
            var email = $('#email').val();
            var password = $('#password').val();
            if (!email || !password) {
                displayActionFailure("Required field(s) missing");
                return;
            }

            validate(email, password);
        });

        $('#to-register').click(function (evt) {
            window.location.href = "register.html";
        });

        $('#to-login').click(function (evt) {
            window.location.href = "login.html";
        });

        $('#clear-store-button').click(function (evt) {
            clearObjectStore();
        });

        var search_button = $('#search-list-button');
        search_button.click(function (evt) {
            displayUserList();
        });

    }

    openDb();
    addEventListeners();
    $('#helloTag').append(localStorage.getItem('curr'));

})(); // Immediately-Invoked Function Expression (IIFE)