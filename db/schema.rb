# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160922004451) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assignments", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "case_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bills", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "case_id"
    t.datetime "date"
    t.float    "spent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "task"
    t.datetime "start_time"
    t.datetime "end_time"
    t.index ["date"], name: "index_bills_on_date", using: :btree
    t.index ["user_id", "case_id"], name: "index_bills_on_user_id_and_case_id", using: :btree
  end

  create_table "cases", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.date     "deadline"
    t.string   "client"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.text     "summary"
    t.index ["deadline"], name: "index_cases_on_deadline", using: :btree
    t.index ["name"], name: "index_cases_on_name", using: :btree
    t.index ["user_id", "name"], name: "index_cases_on_user_id_and_name", using: :btree
    t.index ["user_id"], name: "index_cases_on_user_id", using: :btree
  end

  create_table "reasons", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.text     "tokens"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.index ["email"], name: "index_users_on_email", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
  end

end
