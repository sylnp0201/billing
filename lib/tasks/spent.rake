namespace :spent do

  task recalc: :environment do
    Bill.all.each do |b|
      if b.end_time && b.start_time
        s = ((b.end_time-b.start_time)/3600.0).round(2)
        if s != b.spent
          b.spent = s
          b.save!
        end
      end
    end
  end

end
