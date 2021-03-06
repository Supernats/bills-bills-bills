# encoding: UTF-8
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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140121194110) do

  create_table "friendships", :force => true do |t|
    t.integer  "source_friend_id", :null => false
    t.integer  "target_friend_id", :null => false
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  add_index "friendships", ["source_friend_id"], :name => "index_friendships_on_source_friend_id"
  add_index "friendships", ["target_friend_id"], :name => "index_friendships_on_target_friend_id"

  create_table "loans", :force => true do |t|
    t.integer  "transaction_id", :null => false
    t.integer  "creditor_id",    :null => false
    t.integer  "debtor_id",      :null => false
    t.integer  "amount",         :null => false
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  add_index "loans", ["creditor_id"], :name => "index_loans_on_creditor_id"
  add_index "loans", ["debtor_id"], :name => "index_loans_on_debtor_id"
  add_index "loans", ["transaction_id"], :name => "index_loans_on_transaction_id"

  create_table "transactions", :force => true do |t|
    t.date     "date",        :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "description", :null => false
    t.integer  "total"
  end

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "password_digest"
    t.string   "session_token"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "email"
    t.string   "type"
  end

  add_index "users", ["email"], :name => "index_users_on_email"
  add_index "users", ["session_token"], :name => "index_users_on_session_token", :unique => true

end
