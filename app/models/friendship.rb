class Friendship < ActiveRecord::Base
  attr_accessible :target_friend_id, :source_friend_id
  
  validates :target_friend, :source_friend, :presence => true
  validates :target_friend_id, :uniqueness => { :scope => :source_friend_id }

  belongs_to(
    :target_friend,
    :foreign_key => :target_friend_id,
    :class_name => "User"
  )
  
  belongs_to(
    :source_friend,
    :foreign_key => :source_friend_id,
    :class_name => "User"
  )
end
