#Rails.application.config.session_store :active_record_store
Rails.application.config.session_store :cookie_store, key: 'pbl_session'