(function () {
    const DB_NAME = 'file-db';
    const DB_VERSION = 1; // Use a long long for this value (don't use a float)
    const DB_STORE_NAME = 'file-table';

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

            store.createIndex('fileName', 'fileName', { unique: true });
            store.createIndex('file', 'file', { unique: false });
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
            displayFileList(store);
        };
        req.onerror = function (evt) {
            console.error("clearObjectStore:", evt.target.errorCode);
            displayActionFailure(this.error);
        };
    }

    /**
     * @param {IDBObjectStore=} store
     */
    function displayFileList(store) {
        console.log("displayFileList");

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
                console.log("displayFileList cursor:", cursor);
                req = store.get(cursor.key);
                req.onsuccess = function (evt) {
                    var value = evt.target.result;
                    var list_item = $('<li>' + '[' + cursor.key + '] ' + 'Indexed DB Name: ' + value.fileName + ' , File Name: ' + value.file.name + '</li>');

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

    /**
     * @param {string} fileName
     * @param {string} file
     */
    function addfile(fileName, file) {
        console.log("addfile arguments:", arguments);
        var obj = { fileName: fileName, file: file };

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
            displayFileList(store);
        };
        req.onerror = function () {
            console.error("addfile error", this.error);
            displayActionFailure(this.error);
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

        $('#reset').click(function (evt) {
            resetActionStatus();
        });

        $('#upload-button').click(function (evt) {
            evt.preventDefault();
            console.log("add ...");
            var fileName = $('#fileName').val();
            var file_input = $('#file');
            var selected_file = file_input.get(0).files[0];
            console.log("selected_file:", selected_file);
            if (!fileName || !selected_file) {
                displayActionFailure("Required field(s) missing");
                return;
            }

            addfile(fileName, selected_file);

        });

        $('#clear-store-button').click(function (evt) {
            clearObjectStore();
        });

        var search_button = $('#search-list-button');
        search_button.click(function (evt) {
            displayFileList();
        });

    }

    openDb();
    addEventListeners();

})(); // Immediately-Invoked Function Expression (IIFE)