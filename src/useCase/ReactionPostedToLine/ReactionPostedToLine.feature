Feature: Posting a reaction to a line

Scenario: Posting a reaction successfully
    Given a PreReader exists
    And a Line exists in a Chapter
    When the PreReader posts a Reaction to a Line in a Chapter
    Then the Reaction should be saved to the database
    And an ReactionPostedToLine event should be saved to the event database
