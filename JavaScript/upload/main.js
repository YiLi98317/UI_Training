(function () {
    const DB_NAME = 'file-db';
    const DB_VERSION = 1; // Use a long long for this value (don't use a float)
    const DB_STORE_NAME = 'file-table';

    var db;

    // Used to keep track of which view is displayed to avoid uselessly reloading it
    var current_view_pub_key;

    // file list
    var values = [];

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
                DB_STORE_NAME, { keyPath: 'id', autoIncrement: true }); // 

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

    /**
     * create file list using array
     * @param {array} values 
     */
    function generateList(values) {
        $('#file-selector')
            .append(
                $(document.createElement('label')).prop({
                    for: 'file-list'
                }).html('Choose your file: ')
            )
            .append(
                $(document.createElement('select')).prop({
                    id: 'file-list',
                    name: 'file-list'
                })
            )

        for (const val of values) {
            $('#file-list').append($(document.createElement('option')).prop({
                value: val,
                text: val.charAt(0).toUpperCase() + val.slice(1)
            }))
        }
    }

    /**
     * refresh the selector
     * @param {*} store 
     */
    function refreshSelector(store) {
        var list = [];

        console.log("getting file list");

        if (typeof store == 'undefined') store = getObjectStore(DB_STORE_NAME, 'readonly');

        var req = store.openCursor();
        req.onsuccess = function (evt) {
            // var records = evt.target.result;
            // console.log("records:", records);
            var cursor = evt.target.result;
            if (cursor) {
                console.log("displayFileList cursor:", cursor);
                var reqInner = store.get(cursor.key);
                reqInner.onsuccess = function (evtInner) {
                    var record = evtInner.target.result;
                    console.log("displayFileList record:", record.fileName);
                    list.push(record.fileName);
                }

                cursor.continue();
            } else {
                console.log("No more entries");
            }

            $('#file-list').remove();
            $('#file-selector').append(
                $(document.createElement('select')).prop({
                    id: 'file-list',
                    name: 'file-list'
                })
            );
            for (const val of list) {
                $('#file-list').append($(document.createElement('option')).prop({
                    value: val,
                    text: val
                }))
            }

        };
        req.onerror = function (evt) {
            console.error("fectch file list error:", evt.target.errorCode);
        };
    }

    function newViewerFrame() {
        var viewer = $('#file-viewer');
        viewer.empty();
        var iframe = $('<iframe />');
        viewer.append(iframe);
        return iframe;
    }

    /**
     * 
     * @param {fileName} key 
     * @returns 
     */
    function setInViewer(key) {
        console.log("setInViewer:", arguments);

        var store = getObjectStore(DB_STORE_NAME, 'readonly');

        var req = store.index("fileName").get(key);
        req.onsuccess = function (evt) {
            var blob = evt.target.result.file;
            console.log("setInViewer file:", blob);

            var iframe = newViewerFrame();

            // It is not possible to set a direct link to the
            // blob to provide a mean to directly download it.
            if (blob.type == 'text/html') {
                var reader = new FileReader();
                reader.onload = (function (evt) {
                    var html = evt.target.result;
                    iframe.load(function () {
                        $(this).contents().find('html').html(html);
                    });
                });
                reader.readAsText(blob);
            } else if (blob.type.indexOf('image/') == 0) {
                iframe.load(function () {
                    var img_id = 'image-' + key;
                    var img = $('<img id="' + img_id + '"/>');
                    $(this).contents().find('body').html(img);
                    var obj_url = window.URL.createObjectURL(blob);
                    $(this).contents().find('#' + img_id).attr('src', obj_url);
                    window.URL.revokeObjectURL(obj_url);
                });
            } else if (blob.type == 'application/pdf') {
                $('*').css('cursor', 'wait');
                var obj_url = window.URL.createObjectURL(blob);
                iframe.load(function () {
                    $('*').css('cursor', 'auto');
                });
                iframe.attr('src', obj_url);
                window.URL.revokeObjectURL(obj_url);
            } else {
                iframe.load(function () {
                    $(this).contents().find('body').html("No view available");
                });
            }
        };
        req.onerror = function (evt) {
            console.error("open file -> search file error", evt.target.errorCode);
        };
    }

    /**
     * open selected file in web
     */
    function openFileWeb() {
        var file = $('#file-list').val();
        console.log("current selected file: ", file);
        // Resetting the iframe so that it doesn't display previous content
        newViewerFrame();

        setInViewer(file);
    }

    /**
     * open file locally
     */
    function openFileLocal() {
        // let indexedObj = { name: 'img.jpg', data: 'ArrayBuffer(12342)' }; // suppose this is your indexedDB object
        //get file from indexed db 
        var file = $('#file-list').val();
        console.log("current selected file: ", file);
        var store = getObjectStore(DB_STORE_NAME, 'readonly');

        var req = store.index("fileName").get(file);
        req.onsuccess = function (evt) {
            var blob = evt.target.result.file;
            console.log("download file:", blob);

            //prepare for download
            const URL = window.URL || window.webkitURL;
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.download = file;
            a.href = URL.createObjectURL(blob);
            a.click();
            URL.revokeObjectURL(a.href);
            a.remove();
        };
        req.onerror = function (evt) {
            console.error("open file -> search file error", evt.target.errorCode);
        };


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

        $('#list-refresh').click(function (evt) {
            refreshSelector();
        });

        $('#open-file-local').click(function (evt) {
            openFileLocal();
        });

        $('#open-file-web').click(function (evt) {
            openFileWeb();
        });

    }

    openDb();
    addEventListeners();
    generateList(values);
})(); // Immediately-Invoked Function Expression (IIFE)